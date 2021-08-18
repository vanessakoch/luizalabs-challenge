import 'reflect-metadata';
import { container } from 'tsyringe';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { GetSuggestionUseCase } from './GetSuggestionUseCase';
import { AppError } from '../../../../shared/errors/AppError';

describe('GetSuggestion', () => {
    let ctrl: GetSuggestionUseCase

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
            .resolve(GetSuggestionUseCase)
    })

    describe('constructor()', () => {
        
        it('must be created', () => {
            expect(ctrl).toBeDefined();
        });

    });

    describe('execute()', () => {

        it('must return suggestions from friends', async () => {
            // Setup
            const list = [
                {
                    id: 1,
                    name: 'A',
                    friends: [{
                        id: 2,
                        name:'B'
                    }]
                },
                {
                    id: 3,
                    name: 'B',
                    friends: [{
                        id: 4,
                        name: 'C'
                    }]
                },
                {
                    id: 5,
                    name: 'C',
                    friends: [{
                        id: 6,
                        name: 'D'
                    }]
                }
            ]
            const expected = ['C']
            peopleRepositoryMock.getPeopleByName.mockReturnValue(list[0])
            peopleRepositoryMock.getMyFriendsById.mockReturnValue([list[1]])

            // Execute
            const result = await ctrl.execute(list[0].name)

            // Validate
            expect(result).toStrictEqual(expected)
            expect(peopleRepositoryMock.getPeopleByName).toBeCalledTimes(1)
            expect(peopleRepositoryMock.getMyFriendsById).toBeCalledTimes(1)
        });

        it('should not return any friendship suggestions', async () => {
            const list = [
                {
                    id: 1,
                    name: "A",
                    friends: [{
                        id: 2,
                        name:"B"
                    }]
                },
                {
                    id: 3,
                    name: "B",
                    friends: [{
                        id: 1,
                        name: "A"
                    }]
                },
                {
                    id: 5,
                    name: "C",
                    friends: [{
                        id: 6,
                        name: "D"
                    }]
                }
            ]
            const expected: any = []
            peopleRepositoryMock.getPeopleByName.mockReturnValue(list[0])
            peopleRepositoryMock.getMyFriendsById.mockReturnValue([list[1]])

            // Execute
            const result = await ctrl.execute(list[0].name)

            // Validate
            expect(result).toStrictEqual(expected)
            expect(peopleRepositoryMock.getPeopleByName).toBeCalledTimes(1)
            expect(peopleRepositoryMock.getMyFriendsById).toBeCalledTimes(1)
        })

        it('should return an error if the person doesnt exist', async () => {
            // Setup
            peopleRepositoryMock.getPeopleByName.mockReturnValue(null)            
            
            // Execute and validate
            await expect(ctrl.execute('Vanessa'))
                .rejects.toEqual(new AppError("People doesn't exists!", 303));
        })

    });

});
