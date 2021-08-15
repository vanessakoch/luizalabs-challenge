import { container } from 'tsyringe';
import { IPeopleRepository } from '../../modules/people/repositories/IPeopleRepository';
import { PeopleRepository } from '../../modules/people/repositories/implementations/PeopleRepository';

container.registerSingleton<IPeopleRepository>("PeopleRepository", PeopleRepository)