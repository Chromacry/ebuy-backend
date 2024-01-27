export const generateRandomTrackingNumber = () => {
  const alphanumericChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const trackingNumbersSet = new Set();

  while (true) {
    let trackingNumber = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
      trackingNumber += alphanumericChars.charAt(randomIndex);
    }

    if (!trackingNumbersSet.has(trackingNumber)) {
      trackingNumbersSet.add(trackingNumber);
      return trackingNumber;
    }
  }
};




  
  