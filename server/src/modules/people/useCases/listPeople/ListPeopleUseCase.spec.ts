import 'reflect-metadata';
import { container } from 'tsyringe';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { ListPeopleUseCase } from './ListPeopleUseCase';

describe('ListPeople', () => {
    let ctrl: ListPeopleUseCase

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
            .resolve(ListPeopleUseCase)
    })

    describe('constructor()', () => {

        it('must be created', () => {
            expect(ctrl).toBeDefined();
        });

    });

    describe('execute()', () => {
        
        it('must return all items in the list', async () => {
            const peopleList = [
                { 
                    name: 'John',
                    friends: []
                },
                {
                    name: 'Felix',
                    friends: []
                }
            ]

            const serialized = ["John", "Felix"]

            peopleRepositoryMock.list.mockReturnValue(peopleList)
            
            // Execute
            const result = await ctrl.execute()

            // Validate
            expect(result).toStrictEqual(serialized)
            expect(peopleRepositoryMock.list).toBeCalledTimes(1)
        })
    });
});
