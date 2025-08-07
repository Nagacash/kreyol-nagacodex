
import React from 'react';

/**
 * Uses the browser's Web Speech API to speak a given text.
 * @param text The string to be spoken.
 * @param event The mouse event, used to stop propagation.
 */
export const speak = (text: string, event?: React.MouseEvent) => {
  // Prevent click events on parent elements, like cards.
  event?.stopPropagation();

  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech to prevent overlap.
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Guyanese Creole doesn't have a dedicated voice pack in most browsers.
    // 'fr-FR' is selected as it's the base language and provides the closest phonetic approximation.
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9; // Speak slightly slower for clarity.
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  } else {
    // Fallback for older browsers or environments where the API is not supported.
    alert('Sorry, your browser does not support the audio pronunciation feature.');
  }
};
