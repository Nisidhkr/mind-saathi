// Utility functions for keyword detection and filtering

function normalize(text) {
  return text.toLowerCase().trim().replace(/[^\w\s]/g, '');
}

function containsKeyword(text) {
  const flaggedKeywords = [
    "kill myself",
    "suicidal", 
    "kys",
    "end my life",
    "want to die",
    "suicide",
    "self harm",
    "hurt myself",
    "no point living",
    "better off dead"
  ];
  
  const normalizedText = normalize(text);
  return flaggedKeywords.some(keyword => 
    normalizedText.includes(normalize(keyword))
  );
}

function validateContent(text) {
  if (!text || typeof text !== 'string') {
    return {
      isValid: false,
      reason: "Content cannot be empty"
    };
  }

  if (containsKeyword(text)) {
    return {
      isValid: false,
      reason: "Content contains inappropriate material and has been blocked for safety reasons."
    };
  }

  return {
    isValid: true,
    reason: null
  };
}

module.exports = {
  normalize,
  containsKeyword,
  validateContent
};
