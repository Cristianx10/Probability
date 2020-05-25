import ManagerConteo from './ManagerConteo';
import MConteo_Caso from './MConteo_Caso';
import { typeProps } from './MConteo_Caso';

interface MConteo_Controller {

    nCasosMin: number;
    nCasosMax: number;
    nCasosTotal: number;
    agregarCaso(caso?: typeProps): MConteo_Caso;
    limpiarCasos(): void;
    generarScena(): void;
}

export default MConteo_Controller;