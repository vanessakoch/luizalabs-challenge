import { container } from 'tsyringe';
import { IPeopleRepository } from '../../modules/peoples/repositories/IPeopleRepository';
import { PeopleRepository } from '../../modules/peoples/repositories/implementations/PeopleRepository';

container.registerSingleton<IPeopleRepository>(
    "PeopleRepository",
    PeopleRepository,
)