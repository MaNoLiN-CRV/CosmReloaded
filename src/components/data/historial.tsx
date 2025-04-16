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
                work: 'Maintaining & optimizing a library written in Python for White Rabbit Protocol Testing Machines, achieving a 40% performance increase. Studied the protocol and functioning through the SyncE and PTP Protocol',
                position: 'Junior Test Engineer',
            },
            {
                business: 'Software Engineering Degree',
                work: 'Development & design of any data source automatic apiREST in Rust, focusing on scalability and performance',
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