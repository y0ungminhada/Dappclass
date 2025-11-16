export const SURVEY_FACTORY = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const SURVEY_FACTORY_ABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_min_pool_amouont",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_min_reward_amount",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "SurveyCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "targetNumber",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "question",
                                "type": "string"
                            },
                            {
                                "internalType": "string[]",
                                "name": "options",
                                "type": "string[]"
                            }
                        ],
                        "internalType": "struct Question[]",
                        "name": "questions",
                        "type": "tuple[]"
                    }
                ],
                "internalType": "struct SurveySchema",
                "name": "_survey",
                "type": "tuple"
            }
        ],
        "name": "createSurvey",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getSurveys",
        "outputs": [
            {
                "internalType": "contract Survey[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const;