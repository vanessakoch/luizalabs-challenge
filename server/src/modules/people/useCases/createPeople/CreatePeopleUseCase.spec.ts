import 'reflect-metadata';
import { container } from 'tsyringe';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { CreatePeopleUseCase } from './CreatePeopleUseCase';
import { AppError } from '../../../../shared/errors/AppError';

describe('CreatePeople', () => {
    let ctrl: CreatePeopleUseCase

    const peopleRepositoryMock = {
        list: jest.fn(),
        create: jest.fn(),
        getPeopleByName: jest.fn(),
        getMyFriendsById: jest.fn()
    }

    beforeEach(() => {
        jest.clearAllMocks();

        ctrl = container
            .register<IPeopleRepository>("PeopleRepository", { useValue: peopleRepositoryMock })
            .resolve(CreatePeopleUseCase)
    })

    describe('constructor()', () => {

        it('must be created', () => {
            expect(ctrl).toBeDefined();
        });

    });

    describe('execute()', () => {
        it('must pass all validations and create a person', async () => {
            // Setup
            const testFriend = {
                name: "teste1",
                friends: [{
                    name: "teste2",
                    friends: []
                }]
            }
            const people = {
                name: "Vanessa",
                friends: [testFriend]
            }

            peopleRepositoryMock.getPeopleByName.mockReturnValue(null)
            peopleRepositoryMock.list.mockReturnValue([testFriend])

            // Execute
            await ctrl.execute(people)

            // Validate
            expect(peopleRepositoryMock.getPeopleByName).toBeCalledWith(people.name);
            expect(peopleRepositoryMock.create).toBeCalledWith(people);
            expect(peopleRepositoryMock.create).toBeCalledTimes(1);
            expect(peopleRepositoryMock.list).toBeCalledTimes(1);
        });

        it('should give error when adding person that already exists', async () => {
            // Setup
            const people = {
                name: 'Vanessa',
                friends: []
            }

            peopleRepositoryMock.getPeopleByName.mockReturnValue(people)

            // Execute and validate
            await expect(ctrl.execute(people))
                .rejects.toEqual(new AppError("People already exists!", 303));
            expect(peopleRepositoryMock.list).not.toBeCalled();
            expect(peopleRepositoryMock.create).not.toBeCalled();
        })

        it('should give error when adding person without friends', async () => {
            // Setup
            const people = {
                name: 'Vanessa',
                friends: []
            }

            peopleRepositoryMock.getPeopleByName.mockReturnValue(null)

            // Execute and validate
            await expect(ctrl.execute(people))
                .rejects.toEqual(new AppError("Friends list is empty!", 400));
            expect(peopleRepositoryMock.getPeopleByName).toBeCalledTimes(1)
            expect(peopleRepositoryMock.create).not.toBeCalled();
        })
    }); 
});
