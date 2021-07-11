import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";

function render(vnode, container) {
  const fiberRoot = {
    type: container.nodeName.toLocaleLowerCase(),
    stateNode: container,
    props: {children: vnode},
  };

  scheduleUpdateOnFiber(fiberRoot);
}

export default {render};
