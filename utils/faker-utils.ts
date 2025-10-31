import { faker } from '@faker-js/faker';

export function generateFakeUser() {
    const genders = ['Male', 'Female'];
    const gender = faker.helpers.arrayElement(genders);

    // Gera nomes coerentes com o gênero
    const firstName = gender === 'Male' ? faker.person.firstName('male') : faker.person.firstName('female');
    const lastName = faker.person.lastName();

    const departments = ['TI', 'Vendas', 'Logistica', 'Juridico'];
    const department = faker.helpers.arrayElement(departments);
    
    return {
        firstName,
        lastName,
        email: faker.internet.email({ firstName, lastName }),
        gender,
        phone: '1199999999',
        birthDate: faker.date.birthdate({ min: 18, max: 60, mode: 'age' })
                        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        address: faker.location.streetAddress(),
        hobbies: ['Music'], // ou gerar aleatoriamente
        filePath: '../fixtures/Teste_QA.txt',
        state: 'Uttar Pradesh',
        city: 'Merrut',
        age: faker.number.int({ min: 20, max: 50 }).toString(),
        salary: faker.number.int({ min: 2500, max: 20000 }).toString(),
        department
    };
}
