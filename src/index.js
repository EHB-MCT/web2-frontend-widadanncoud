import Cleave from 'cleave.js';
require('cleave.js/dist/addons/cleave-phone.be');

new Cleave('#name', {
    uppercase: true
});

new Cleave('#DOB', {
    date: true,
    delimiter: '-',
    datePattern: ['d', 'm', 'Y']
});
new Cleave('#age', {
    numeral: true,
    numeralPositiveOnly: true
});
new Cleave('#phone', {
    phone: true,
    phoneRegionCode: 'BE'
});

