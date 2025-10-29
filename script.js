// Global variable to track selected package
let selectedPackageId = null;

// Function to open the modal with package details
function openModal(id, name, validity, price) {
  selectedPackageId = id;
  
  // Update modal content
  document.getElementById('modalPackageName').textContent = name;
  document.getElementById('modalPackageValidity').textContent = `Valid For: ${validity}`;
  document.getElementById('modalPackagePrice').textContent = `KES ${price}`;
  
  // Reset phone number field
  document.getElementById('mobileNumber').value = '';
  
  // Show modal
  document.getElementById('purchaseModal').style.display = 'flex';
  
  // Highlight selected package
  const packages = document.querySelectorAll('.package');
  packages.forEach(pkg => pkg.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}

// Function to close the modal
function closeModal() {
  document.getElementById('purchaseModal').style.display = 'none';
  document.getElementById('mobileNumber').value = '';
  
  // Remove selection highlight
  const packages = document.querySelectorAll('.package');
  packages.forEach(pkg => pkg.classList.remove('selected'));
}

// Function to process the purchase
function processPurchase() {
  const mobileNumber = getFullPhoneNumber();
  const paymentMethod = document.getElementById('paymentMethod').value;
  // Meshack! Change this part ro remove error.
  if (!mobileNumber || mobileNumber === '+254') {
    alert('Please enter your mobile number');
    return;
  }
  
  // Validate phone number format
  const phoneRegex = /^(\+254|0)[1-9]\d{8}$/;
  if (!phoneRegex.test(mobileNumber)) {
    alert('Please enter a valid Kenyan phone number');
    return;
  }
  
  // Simulate purchase process
  alert(`Processing purchase for package ${selectedPackageId} for ${mobileNumber} via ${paymentMethod}`);
  
  // Close modal
  closeModal();
  
  // Show the timer when a package is purchased
  document.getElementById('timer').style.display = 'block';
  startTimer(15 * 60); // 15 minutes in seconds
}

// Get the properly formatted phone number
function getFullPhoneNumber() {
  const mobileInput = document.getElementById('mobileNumber');
  const value = mobileInput.value.replace(/\D/g, '');
  
  if (value.length === 0) return '';
  
  // If number starts with 254 and is 12 digits, add + prefix
  if (value.startsWith('254') && value.length === 12) {
    return '+' + value;
  }
  // If number starts with 0 and is 10 digits, convert to +254 format
  else if (value.startsWith('0') && value.length === 10) {
    return '+254' + value.substring(1);
  }
  // If number is 9 digits and doesn't start with 0, assume it's missing +254
  else if (value.length === 9 && !value.startsWith('0')) {
    return '+254' + value;
  }
  // Otherwise, return the raw value (will fail validation)
  else {
    return value;
  }
}

// Setup phone input with proper validation
function setupPhoneInput() {
  const mobileInput = document.getElementById('mobileNumber');
  
  if (mobileInput) {
    // Add a placeholder
    mobileInput.placeholder = "e.g. 0712345678 or 254712345678";
    
    // Only allow numbers and limit based on starting digits
    mobileInput.addEventListener('input', function(e) {
      // Remove any non-digit characters
      let value = e.target.value.replace(/\D/g, '');
      
      // Determine max length based on starting digits
      let maxLength = 9; // Default for numbers starting with 7
      
      if (value.startsWith('254')) {
        maxLength = 12; // 254 + 9 digits = 12 total
      } else if (value.startsWith('0')) {
        maxLength = 10; // 0 + 9 digits = 10 total
      }
      
      // Limit to max length
      if (value.length > maxLength) {
        value = value.slice(0, maxLength);
      }
      
      e.target.value = value;
    });
    
    // Format on blur to show full international format
    mobileInput.addEventListener('blur', function(e) {
      const value = e.target.value.replace(/\D/g, '');
      
      if (value.length === 0) return;
      
      // Format based on different patterns
      if (value.startsWith('254') && value.length === 12) {
        e.target.value = '+' + value;
      } else if (value.startsWith('0') && value.length === 10) {
        e.target.value = '+254' + value.substring(1);
      } else if (value.length === 9 && !value.startsWith('0')) {
        e.target.value = '+254' + value;
      }
      // Otherwise leave as is (will fail validation)
    });
    
    // Remove + prefix when focusing to make editing easier
    mobileInput.addEventListener('focus', function(e) {
      if (e.target.value.startsWith('+254')) {
        e.target.value = e.target.value.substring(4); // Remove +254
      } else if (e.target.value.startsWith('+')) {
        e.target.value = e.target.value.substring(1); // Remove + only
      }
    });
  }
}

// Function to start the session timer
function startTimer(duration) {
  let timer = duration;
  let minutes, seconds;
  
  const countdownEl = document.getElementById('countdown');
  const interval = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    countdownEl.textContent = minutes + ":" + seconds;
    
    if (--timer < 0) {
      clearInterval(interval);
      countdownEl.textContent = "EXPIRED";
      countdownEl.style.color = 'red';
    }
  }, 1000);
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
  const modal = document.getElementById('purchaseModal');
  if (event.target === modal) {
    closeModal();
  }
};

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  setupPhoneInput();
});
