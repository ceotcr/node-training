/*
Write a function that validates an object like: { name: "John", email: "", age: 17 } Validation rules: ● Name is required ● email must not be empty and should be a valid email ● age must be over 18
*/

const validateData = ({ name, email, age }) => {
    const errors = [];
    if (!name || name.trim() === '') {
        errors.push('Name is required');
    }
    if (!email || email.trim() === '') {
        errors.push('Email is required');
    } else if (!validateEmail(email)) {
        errors.push('Email is not valid');
    }
    if (!age || age < 18) {
        errors.push('Age must be over 18');
    }
    return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


const userInputs = [
    { name: 'John', email: 'john@example', age: 17 },
    { name: 'Jane', email: 'jane@example.com', age: 18 },
    { name: '', email: 'jane@example.com', age: 18 },
    { name: 'Jane', email: '', age: 18 }
]

userInputs.forEach(input => {
    const result = validateData(input);
    if (result.valid) {
        console.log('Valid data:', input);
    } else {
        console.log('Invalid data:', input, 'Errors:', result.errors);
    }
});

/*
> node .\p2.js
Invalid data: { name: 'John', email: 'john@example', age: 17 } Errors: [ 'Email is not valid', 'Age must be over 18' ]
Valid data: { name: 'Jane', email: 'jane@example.com', age: 18 }
Invalid data: { name: '', email: 'jane@example.com', age: 18 } Errors: [ 'Name is required' ]
Invalid data: { name: 'Jane', email: '', age: 18 } Errors: [ 'Email is required' ]
*/