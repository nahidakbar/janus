/**
 * Janus Copyright (C) 2017 Nahid Akbar
 */

"use strict";

import * as schema from "common/schema"

const name = "User";

const schemaDefinition = {
  type: 'object',
  properties: {
    Photo: {
      type: 'string',
      format: 'image'
    },
    Summary: {
      type: 'string',
    },
    Needs: {
      type: 'object',
      properties: {
        Stated: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        Real: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        Unstated: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        Delight: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        Secret: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        }
      }
    },
    CurrentOptions: {
      type: 'object',
      properties: {
        CompetingProducts: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        Other: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        }
      }
    },
    Demographics: {
      type: 'object',
      properties: {
        AgeYears: {
          type: 'object',
          properties: {
            Minimum: {
              type: 'number'
            },
            Average: {
              type: 'number'
            },
            Actual: {
              type: 'number'
            },
            Estimated: {
              type: 'number'
            },
            Expected: {
              type: 'number'
            },
            Maximum: {
              type: 'number'
            }
          }
        },
        Income: {
          type: 'object',
          properties: {
            Low: {
              type: 'boolean'
            },
            Medium: {
              type: 'boolean'
            },
            High: {
              type: 'boolean'
            }
          }
        },
        Gender: {
          type: 'object',
          properties: {
            Male: {
              type: 'boolean'
            },
            Female: {
              type: 'boolean'
            }
          }
        },
        EducationLevel: {
          type: 'object',
          properties: {
            Uneducated: {
              type: 'boolean'
            },
            Elementary: {
              type: 'boolean'
            },
            HighSchool: {
              type: 'boolean'
            },
            Diploma: {
              type: 'boolean'
            },
            Bachelors: {
              type: 'boolean'
            },
            Masters: {
              type: 'boolean'
            },
            Doctorate: {
              type: 'boolean'
            }
          }
        },
        Occupation: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        SocialClass: {
          type: 'object',
          properties: {
            Lower: {
              type: 'boolean'
            },
            Middle: {
              type: 'boolean'
            },
            Upper: {
              type: 'boolean'
            }
          }
        },
        SizeOfFamily: {
          type: 'object',
          properties: {
            Small: {
              type: 'boolean'
            },
            Medium: {
              type: 'boolean'
            },
            Large: {
              type: 'boolean'
            }
          }
        },
        MaritalStatus: {
          type: 'object',
          properties: {
            Single: {
              type: 'boolean'
            },
            Married: {
              type: 'boolean'
            },
            Divorced: {
              type: 'boolean'
            },
            Widowed: {
              type: 'boolean'
            }
          }
        },
        FamilyAge: {
          type: 'object',
          properties: {
            Young: {
              type: 'boolean'
            },
            MiddleAged: {
              type: 'boolean'
            },
            Old: {
              type: 'boolean'
            }
          }
        },
        FamilyDependants: {
          type: 'object',
          properties: {
            Children: {
              type: 'boolean'
            },
            NoChildren: {
              type: 'boolean'
            },
            Dependants: {
              type: 'boolean'
            },
            NoDependants: {
              type: 'boolean'
            }
          }
        },
        EthnicBackground: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        Other: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        }
      }
    },
    Psychographic: {
      type: 'object',
      properties: {
        Motivation: {
          type: 'object',
          properties: {
            Safety: {
              type: 'boolean'
            },
            PersonalAppearance: {
              type: 'boolean'
            },
            Health: {
              type: 'boolean'
            },
            Status: {
              type: 'boolean'
            },
            Affiliation: {
              type: 'boolean'
            }
          }
        },
        PersonalityType: {
          type: 'object',
          properties: {
            Introverted: {
              type: 'boolean'
            },
            Extroverted: {
              type: 'boolean'
            },
            Sensing: {
              type: 'boolean'
            },
            Intuition: {
              type: 'boolean'
            },
            Thinking: {
              type: 'boolean'
            },
            Feeling: {
              type: 'boolean'
            },
            Judging: {
              type: 'boolean'
            },
            Perceiving: {
              type: 'boolean'
            }
          }
        },
        Activities: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        Interests: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        Opinions: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        BeliefsValues: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        Other: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        }
      }
    },
    Geographic: {
      type: 'object',
      properties: {
        Location: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        }
      }
    },
    Behavioural: {
      type: 'object',
      properties: {
        UsageOccation: {
          type: 'object',
          properties: {
            Regular: {
              type: 'boolean'
            },
            Special: {
              type: 'boolean'
            },
            Festive: {
              type: 'boolean'
            },
            GiftGiving: {
              type: 'boolean'
            }
          }
        },
        UsageRate: {
          type: 'object',
          properties: {
            Light: {
              type: 'boolean'
            },
            Moderate: {
              type: 'boolean'
            },
            Heavy: {
              type: 'boolean'
            }
          }
        },
        BenefitSought: {
          type: 'object',
          properties: {
            Economy: {
              type: 'boolean'
            },
            Quality: {
              type: 'boolean'
            },
            ServiceLevel: {
              type: 'boolean'
            },
            Convenience: {
              type: 'boolean'
            },
            Access: {
              type: 'boolean'
            }
          }
        },
        UserType: {
          type: 'object',
          properties: {
            FirstTime: {
              type: 'boolean'
            },
            Regular: {
              type: 'boolean'
            },
            NonUser: {
              type: 'boolean'
            }
          }
        },
        Loyalty: {
          type: 'object',
          properties: {
            Loyal: {
              type: 'boolean'
            },
            Switcher: {
              type: 'boolean'
            },
            NonLoyal: {
              type: 'boolean'
            },
            Lapsed: {
              type: 'boolean'
            }
          }
        },
        Readiness: {
          type: 'object',
          properties: {
            Unaware: {
              type: 'boolean'
            },
            Arare: {
              type: 'boolean'
            },
            Intent: {
              type: 'boolean'
            },
            NotIntent: {
              type: 'boolean'
            }
          }
        },
        Attitude: {
          type: 'object',
          properties: {
            Enthusiast: {
              type: 'boolean'
            },
            Indifferent: {
              type: 'boolean'
            },
            Hostile: {
              type: 'boolean'
            },
            PriceConscious: {
              type: 'boolean'
            },
            QualityConscious: {
              type: 'boolean'
            }
          }
        },
        Adaption: {
          type: 'object',
          properties: {
            Innovator: {
              type: 'boolean'
            },
            EarlyAdapter: {
              type: 'boolean'
            },
            EarlyMajority: {
              type: 'boolean'
            },
            LateMajority: {
              type: 'boolean'
            },
            LateAdapter: {
              type: 'boolean'
            },
            Laggerd: {
              type: 'boolean'
            }
          }
        },
        LearningType: {
          type: 'object',
          properties: {
            VisualSpatial: {
              type: 'boolean'
            },
            Auditory: {
              type: 'boolean'
            },
            VerbalLinguistic: {
              type: 'boolean'
            },
            PhysicalKinesthetic: {
              type: 'boolean'
            },
            SoliteryIntrapersornal: {
              type: 'boolean'
            },
            SocialInterpersonal: {
              type: 'boolean'
            },
            LogicalMathematical: {
              type: 'boolean'
            }
          }
        },
        LearningStage: {
          type: 'object',
          properties: {
            UnconsciousIncompetence: {
              type: 'boolean'
            },
            ConsciousIncompetence: {
              type: 'boolean'
            },
            ConsciousCompetence: {
              type: 'boolean'
            },
            UnconsciousCompetence: {
              type: 'boolean'
            }
          }
        },
        Other: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        }
      }
    },
    Technographic: {
      type: 'object',
      properties: {
        Optimism: {
          type: 'object',
          properties: {
            Optimist: {
              type: 'boolean'
            },
            Pessimist: {
              type: 'boolean'
            }
          }
        },
        Career: {
          type: 'object',
          properties: {
            FastForwarder: {
              type: 'boolean'
            },
            TechnoStriver: {
              type: 'boolean'
            },
            HandShaker: {
              type: 'boolean'
            }
          }
        },
        Family: {
          type: 'object',
          properties: {
            NewAgeNurcherer: {
              type: 'boolean'
            },
            DigitalHopeful: {
              type: 'boolean'
            },
            Traditionalist: {
              type: 'boolean'
            }
          }
        },
        Entertainment: {
          type: 'object',
          properties: {
            MousePotato: {
              type: 'boolean'
            },
            GadgetGrabber: {
              type: 'boolean'
            },
            MediaJunkie: {
              type: 'boolean'
            }
          }
        },
        OperatingSystem: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        Browser: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        TechnologyStack: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        },
        Other: {
          type: 'array',
          format: 'onePerLineString',
          items: {
            type: 'string'
          }
        }
      }
    }
  }
};

const view = schema.viewer(schemaDefinition);

const edit = schema.editor(schemaDefinition);

const templates = {
  Blank: {},
};

export const user = {
  name,
  view,
  edit,
  templates
};
