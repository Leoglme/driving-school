import { defineRule } from 'vee-validate';

defineRule('required', (value: string) => {
    if (!value || !value.length) {
        return 'Ce champ est requis';
    }

    return true;
});

defineRule('email', (value: string) => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return true;
    }

    // Check if email
    if (!/[\w\-.]+@([\w-]+\.)+[\w-]{2,4}/.test(value)) {
        return 'Ce champ doit être un email valide';
    }

    return true;
});
