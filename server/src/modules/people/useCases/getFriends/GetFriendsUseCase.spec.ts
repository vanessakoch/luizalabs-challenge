import 'reflect-metadata';
import { container } from 'tsyringe';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { GetFriendsUseCase } from './GetFriendsUseCase';
import { AppError } from '../../../../shared/errors/AppError';

describe('GetFriends', () => {
    let ctrl: GetFriendsUseCase

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
            .resolve(GetFriendsUseCase)
    })

    describe('constructor()', () => {

        it('must be created', () => {
            expect(ctrl).toBeDefined();
        });

    });

    describe('execute()', () => {

        it('should return a person friends list', async () => {
            // Setup
            const people = {
                name: 'teste',
                friends: [
                    {
                        id: 1,
                        name: 'Maria'
                    },
                    {
                        id: 2,
                        name: 'João'
                    }
                ]
            }
            const expected = ["Maria", "João"]
            peopleRepositoryMock.getPeopleByName.mockReturnValue(people)
    
            // Execute
            const result = await ctrl.execute(people.name)
    
            // Validate
            expect(result).toStrictEqual(expected)
            expect(peopleRepositoryMock.getPeopleByName).toBeCalledTimes(1)
        });

        it('should return an error if the person doesnt exist', async () => {
            // Setup
            peopleRepositoryMock.getPeopleByName.mockReturnValue(null)            
    
            // Execute and validate
            await expect(ctrl.execute('Vanessa'))
                .rejects.toEqual(new AppError("People doesn't exists!", 303));
        })

    });

});
