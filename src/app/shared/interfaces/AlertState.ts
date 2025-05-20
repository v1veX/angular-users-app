export interface AlertState {
    isShown: boolean;
    isCloseOnOuterClick: boolean;
    isContainsLink: boolean;
    title: string;
    message: string;
    buttonText: string;
    link: string;
}