export interface IEvaluation {
    correctKey: string,
    question: string,
    options: IOption[]
}
export interface IOption{
    key:string,
    option:string
}