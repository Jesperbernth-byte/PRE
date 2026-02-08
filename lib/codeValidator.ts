/**
 * Code Validation Library - Phase 3
 * Ensures generated code is safe and doesn't break the site
 */

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Forbidden patterns that should never appear in generated code
const FORBIDDEN_PATTERNS = [
  /eval\(/gi,
  /Function\(/gi,
  /\.innerHTML\s*=/gi,
  /dangerouslySetInnerHTML/gi,
  /document\.write/gi,
  /process\.env/gi, // Should use import.meta.env in Vite
  /__dirname/gi,
  /__filename/gi,
  /require\(/gi, // Should use ES6 imports
];

// Required patterns for TypeScript files
const REQUIRED_TS_PATTERNS = [
  /export\s+(default\s+)?(const|function|class|interface|type)/,
];

// Patterns that should be preserved
const PRESERVE_PATTERNS = [
  /import\s+.*from\s+['"][^'"]+['"]/g,
  /export\s+(default\s+)?/g,
];

/**
 * Validate generated TypeScript/TSX code
 */
export function validateTypeScriptCode(code: string, filePath: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for forbidden patterns
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(code)) {
      errors.push(`Forbudt pattern fundet: ${pattern.source}`);
    }
  }

  // Check for required exports in TypeScript files
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    const hasExport = REQUIRED_TS_PATTERNS.some(pattern => pattern.test(code));
    if (!hasExport) {
      errors.push('TypeScript fil mangler export statement');
    }
  }

  // Check for React imports in TSX files
  if (filePath.endsWith('.tsx') && !code.includes('import React')) {
    warnings.push('TSX fil mangler React import (kan være OK i React 17+)');
  }

  // Check for proper React component structure
  if (filePath.endsWith('.tsx')) {
    const hasComponentExport = /export\s+default\s+\w+/.test(code) ||
                               /const\s+\w+:\s*React\.FC/.test(code);
    if (!hasComponentExport) {
      errors.push('React komponent mangler proper export');
    }
  }

  // Validate JSON-like structures (constants.tsx)
  if (filePath.includes('constants')) {
    const brackets = code.match(/[{}\[\]]/g) || [];
    const openBrackets = brackets.filter(b => b === '{' || b === '[').length;
    const closeBrackets = brackets.filter(b => b === '}' || b === ']').length;

    if (openBrackets !== closeBrackets) {
      errors.push('Ubalancerede brackets i constants fil');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate CSS code
 */
export function validateCSSCode(code: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for balanced braces
  const openBraces = (code.match(/{/g) || []).length;
  const closeBraces = (code.match(/}/g) || []).length;

  if (openBraces !== closeBraces) {
    errors.push('Ubalancerede brackets i CSS');
  }

  // Check for dangerous CSS (rare but possible)
  if (code.includes('javascript:')) {
    errors.push('JavaScript URL fundet i CSS (sikkerhedsrisiko)');
  }

  // Check for @import (should use Tailwind or inline)
  if (code.includes('@import')) {
    warnings.push('@import fundet - overvej at bruge Tailwind i stedet');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Compare old and new code to ensure no unintended deletions
 */
export function validateCodeChanges(
  oldCode: string,
  newCode: string,
  changeDescription: string
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check that imports are preserved
  const oldImports = oldCode.match(/import\s+.*from\s+['"][^'"]+['"]/g) || [];
  const newImports = newCode.match(/import\s+.*from\s+['"][^'"]+['"]/g) || [];

  const missingImports = oldImports.filter(imp => !newCode.includes(imp));
  if (missingImports.length > 0 && !changeDescription.toLowerCase().includes('fjern import')) {
    warnings.push(`${missingImports.length} imports blev fjernet - er det meningen?`);
  }

  // Check for significant code reduction (might indicate deletion)
  const oldLines = oldCode.split('\n').length;
  const newLines = newCode.split('\n').length;
  const reductionPercent = ((oldLines - newLines) / oldLines) * 100;

  if (reductionPercent > 50 && !changeDescription.toLowerCase().includes('slet')) {
    warnings.push(`${reductionPercent.toFixed(0)}% af koden blev fjernet - tjek om det er korrekt`);
  }

  // Check that exports are preserved
  const oldExports = oldCode.match(/export\s+(default\s+)?/g) || [];
  const newExports = newCode.match(/export\s+(default\s+)?/g) || [];

  if (oldExports.length > newExports.length) {
    errors.push('Nogle exports blev fjernet - dette kan bryde importen andre steder');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Master validation function
 */
export function validateGeneratedCode(
  oldCode: string,
  newCode: string,
  filePath: string,
  changeDescription: string
): ValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  // File type validation
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    const tsResult = validateTypeScriptCode(newCode, filePath);
    allErrors.push(...tsResult.errors);
    allWarnings.push(...tsResult.warnings);
  } else if (filePath.endsWith('.css')) {
    const cssResult = validateCSSCode(newCode);
    allErrors.push(...cssResult.errors);
    allWarnings.push(...cssResult.warnings);
  }

  // Change validation
  const changeResult = validateCodeChanges(oldCode, newCode, changeDescription);
  allErrors.push(...changeResult.errors);
  allWarnings.push(...changeResult.warnings);

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings
  };
}
