document.addEventListener('DOMContentLoaded', function() {
    // Example: focus first input in forms
    var forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        var firstInput = form.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    });
});
