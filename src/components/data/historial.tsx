export interface JobEntry {
    business: string;
    work: string;
    position: string;
}

export interface PersonHistorial {
    person: string;
    jobs: JobEntry[];
}

const historial: PersonHistorial[] = [
    {
        person: 'Félix Caba',
        jobs: [
            {
                business: 'Safran Navigation & Timing',
                work: 'Development & optimization of testing implementations in Python & RobotFramework',
                position: 'Junior Test Engineer',
            },
            {
                business: 'Software Engineering Degree',
                work: 'Development & design of any data source automatic apiREST in Rust',
                position: 'Lead Developer',
            },
        ],
    },
    {
        person: 'Manuel Cervantes',
        jobs: [
            {
                business: 'Expert Lims',
                work: 'Maintaining a big laboratory project',
                position: 'Software Engineer',
            },
            {
                business: 'Software Engineering Degree',
                work: 'Development & design of any data source automatic apiREST in Rust',
                position: 'Lead Developer',
            },
        ],
    },
];

export default historial;