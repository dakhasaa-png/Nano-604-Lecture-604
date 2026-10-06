export type LLO = 'LLO-1' | 'LLO-2' | 'LLO-3' | 'LLO-4' | 'LLO-5' | 'LLO-6';

export type SlideCategory = 
  | 'Удиртгал ба SPM гэр бүл'
  | 'STM: Туннелийн микроскопи'
  | 'AFM: Кантилевер ба хүчний мэдрэгч'
  | 'Нарийвчлал, конволюци ба хийсвэр дүр'
  | 'Хүч-зайн муруй ба Шалгалт тохируулга'
  | 'Аргын сонголт ба Туршилтын дизайн';

export interface SpeakerNotes {
  teachingIntent: string;
  whatToExplain: string;
  physicalInterpretation: string;
  commonMisconception: string;
  expectedStudentResponse: string;
  artifactWarning: string;
  sourceTrace: string;
  figureProvenance: string;
  transition: string;
}

export interface EquationDefinition {
  formula: string;
  symbols: { symbol: string; meaning: string }[];
  physicalMeaning: string;
  limitation?: string;
}

export interface DataInterpretationContract {
  observation: string;
  measuredSignal: string;
  physicalOrigin: string;
  alternativeExplanation: string;
  limitation: string;
  conclusion: string;
}

export interface ComparisonRow {
  parameter: string;
  stm: string;
  afm: string;
  significance: string;
}

export interface InteractiveWidgetConfig {
  type: 
    | 'none'
    | 'stm_tunneling_calc'
    | 'stm_hopg_inspector'
    | 'afm_cantilever_transducer'
    | 'afm_potential_modes'
    | 'afm_mode_selector'
    | 'tip_convolution_sim'
    | 'feedback_gain_sim'
    | 'force_distance_curve_explorer'
    | 'afm_mit_data_inspector'
    | 'nist_srm3461_calibration'
    | 'method_selection_worked_example'
    | 'experimental_design_canvas'
    | 'exit_check_quiz';
  initialParams?: Record<string, any>;
}

export interface SlideData {
  id: number;
  slideNumber: number;
  slideCode: string;
  title: string;
  subtitle?: string;
  category: SlideCategory;
  targetLLO: LLO;
  keyMessage: string;
  sourceSupport: string;
  figureProvenance: string;
  studentFacing: boolean;
  bullets: string[];
  keyTakeaways?: string[];
  equation?: EquationDefinition;
  interpretationContract?: DataInterpretationContract;
  comparisonRows?: ComparisonRow[];
  interactiveWidget?: InteractiveWidgetConfig;
  notes: SpeakerNotes;
}
