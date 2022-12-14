import { ClassicBattleship, ClassicCarrier, ClassicSubmarine, ClassicCruiser, ClassicSpeedboat } from "../../models/Ships/ClassicShips";

export interface Visitor {
    visitClassicCarrier(element: ClassicCarrier): void;
    visitClassicBattleship(element: ClassicBattleship): void;
    visitClassicCruiser(element: ClassicCruiser): void;
    visitClassicSubmarine(element: ClassicSubmarine): void;
    visitClassicSpeedboat(element: ClassicSpeedboat): void;
}