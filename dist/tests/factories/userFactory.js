import { faker } from '@faker-js/faker';
export function userFactory() {
    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };
}
