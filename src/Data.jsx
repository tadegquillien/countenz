//this object records the participant data
import { condition } from './randomizedParameters';
const Data = {
  //the participant's Prolific ID
  prolificId: [],
  //the comprehension check
  compCheck: [],
  // the experimental condition
  condition: [condition],
  //the main DV: the participant's answers to the causal questions
  responses: [],
  //the free-form comment about how people made their guesses
  freeComment: [],
  //the answers to demographic questions
  demographics: []
};

export default Data;