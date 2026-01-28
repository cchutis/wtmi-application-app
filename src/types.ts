export type FormValues = {
    email: string
    fullName: string
    phoneNumber: string

    address: {
        street: string
        city: string
        state: string
        zip: string
    }

    ageRange: string
    gender: string
    genderOther?: string
    sexualOrientation: string
    sexualOrientationOther?: string
    race: string
    ethnicity: string[]
    raceEthnicityDescription: string

    educationLevel: string
    contactMethod: string
    contactMethodValue: string

    jobs: [
        {
            jobName: string
            title: string
            generalDescription: string
            responsibilities: string
            teamOrSoloDescription: string
            favoritePart: string
            skillsLearned: string
        },
        {
            jobName: string
            title: string
            generalDescription: string
            responsibilities: string
            teamOrSoloDescription: string
            favoritePart: string
            skillsLearned: string
        },
        {
            jobName: string
            title: string
            generalDescription: string
            responsibilities: string
            teamOrSoloDescription: string
            favoritePart: string
            skillsLearned: string
        },
    ]

    forProfit: {
        mainCategory?: string
        areas: string[]
        areasOther?: string
        comments: string
        religiousOrgAreasText?: string
    }
    nonProfit: {
        mainCategory?: string
        areas: string[]
        areasOther?: string
        comments: string
    }

    workingPreferences: string[]
    workingPreferencesComments: string

    workType: string
    workTypeOther?: string
    workTypeComments: string

    availabilityGrid: Record<string, Record<string, boolean>>

    paroleProbationRestrictionsText: string
}

const emptyJob = {
    jobName: '',
    title: '',
    generalDescription: '',
    responsibilities: '',
    teamOrSoloDescription: '',
    favoritePart: '',
    skillsLearned: '',
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const
const times = ['6am–12pm', '12pm–6pm', '6pm–12am', '12am - 6am', 'None'] as const

const initialGrid: Record<string, Record<string, boolean>> = Object.fromEntries(days.map((d) => [d, Object.fromEntries(times.map((t) => [t, false])) as Record<string, boolean>])) as Record<string, Record<string, boolean>>

export const defaultValues: FormValues = {
    email: '',
    fullName: '',
    phoneNumber: '',

    address: { street: '', city: '', state: '', zip: '' },

    ageRange: '',
    gender: '',
    genderOther: '',
    sexualOrientation: '',
    sexualOrientationOther: '',
    race: '',
    ethnicity: [],
    raceEthnicityDescription: '',

    educationLevel: '',
    contactMethod: '',
    contactMethodValue: '',

    jobs: [{ ...emptyJob }, { ...emptyJob }, { ...emptyJob }],

    forProfit: { mainCategory: undefined, areas: [], areasOther: '', comments: '', religiousOrgAreasText: '' },
    nonProfit: { mainCategory: undefined, areas: [], areasOther: '', comments: '' },

    workingPreferences: [],
    workingPreferencesComments: '',

    workType: '',
    workTypeOther: '',
    workTypeComments: '',

    availabilityGrid: initialGrid,

    paroleProbationRestrictionsText: '',
}
