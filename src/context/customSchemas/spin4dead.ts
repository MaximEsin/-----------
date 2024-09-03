import Cluster from '../../components/CustomEvents/spin4dead/Cluster/Cluster';
import Joker from '../../components/CustomEvents/spin4dead/Joker/Joker';
import MedKit from '../../components/CustomEvents/spin4dead/MedKit/MedKit';
import Refresh from '../../components/CustomEvents/spin4dead/Refresh/Refresh';
import Upgrade from '../../components/CustomEvents/spin4dead/Upgrade/Upgrade';
import { CustomSchema } from '../../interfaces/customSchema';
import { Spin4DeadEvents } from '../commonSchemas/spin4dead';

export const spin4deadCustomSchema: CustomSchema[] = [
  {
    name: Spin4DeadEvents[Spin4DeadEvents.Cluster],
    element: Cluster,
  },
  {
    name: Spin4DeadEvents[Spin4DeadEvents.MedKit],
    element: MedKit,
  },
  {
    name: Spin4DeadEvents[Spin4DeadEvents.Joker],
    element: Joker,
  },
  {
    name: Spin4DeadEvents[Spin4DeadEvents.Refresh],
    element: Refresh,
  },
  {
    name: Spin4DeadEvents[Spin4DeadEvents.Upgrade],
    element: Upgrade,
  },
];
