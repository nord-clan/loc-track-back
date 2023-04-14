import type { INode } from '#/models/node';
import { v4 as uuid } from 'uuid';

export const nodesTables = [
  ...[
    {
      id: uuid(),
      layerId: '2',
      pos: [701, 455],
      angle: 0,
      width: 50,
      height: 90,
      type: 'table'
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [701, 364],
      angle: 0,
      width: 50,
      height: 90,
      type: 'table'
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [701, 273],
      angle: 0,
      width: 50,
      height: 90,
      type: 'table'
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [701, 182],
      angle: 0,
      width: 50,
      height: 90,
      type: 'table'
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [701, 91],
      angle: 0,
      width: 50,
      height: 90,
      type: 'table'
    }
  ],
  ...[
    {
      id: uuid(),
      layerId: '2',
      pos: [486, 455],
      width: 50,
      height: 90,
      angle: 180,
      type: 'table'
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [486, 364],
      width: 50,
      height: 90,
      angle: 180,
      type: 'table'
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [486, 273],
      width: 50,
      height: 90,
      angle: 180,
      type: 'table'
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [486, 182],
      width: 50,
      height: 90,
      type: 'table',
      angle: 180
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [486, 91],
      width: 50,
      height: 90,
      type: 'table',
      angle: 180
    }
  ],
  ...[
    {
      id: uuid(),
      layerId: '2',
      pos: [432, 455],
      width: 50,
      height: 90,
      type: 'table'
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [432, 364],
      angle: 0,
      width: 50,
      height: 90,
      type: 'table'
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [432, 273],
      angle: 0,
      width: 50,
      height: 90,
      type: 'table'
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [432, 182],
      angle: 0,
      width: 50,
      height: 90,
      type: 'table'
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [432, 91],
      angle: 0,
      width: 50,
      height: 90,
      type: 'table'
    }
  ],
  ...[
    {
      id: uuid(),
      layerId: '2',
      pos: [219, 455],
      width: 50,
      height: 90,
      type: 'table',
      angle: 180
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [219, 264],
      width: 50,
      height: 90,
      type: 'table',
      angle: 180
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [219, 273],
      width: 50,
      height: 90,
      type: 'table',
      angle: 180
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [219, 182],
      width: 50,
      height: 90,
      type: 'table',
      angle: 180
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [219, 91],
      width: 50,
      height: 90,
      type: 'table',
      angle: 180
    }
  ]
] as INode[];

export const nodesTablesLayer1 = [
  ...[
    {
      id: uuid(),
      layerId: '1',
      pos: [19, 455],
      width: 50,
      height: 90,
      type: 'table',
      angle: 90
    },
    {
      id: uuid(),
      layerId: '1',
      pos: [719, 364],
      width: 50,
      height: 90,
      type: 'table',
      angle: 180
    },
    {
      id: uuid(),
      layerId: '1',
      pos: [250, 673],
      width: 50,
      height: 90,
      type: 'table',
      angle: 0
    },
    {
      id: uuid(),
      layerId: '1',
      pos: [319, 382],
      width: 50,
      height: 90,
      type: 'table',
      angle: 270
    },
    {
      id: uuid(),
      layerId: '1',
      pos: [119, 91],
      width: 50,
      height: 90,
      type: 'table',
      angle: 180
    }
  ]
] as INode[];

export const nodesCommon = [
  ...[
    {
      id: uuid(),
      pos: [519, 600],
      layerId: '2',
      type: 'default',
      angle: 90,
      width: 50,
      height: 50
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [519, 900],
      type: 'default',
      angle: 90,
      width: 50,
      height: 50
    },
    {
      id: uuid(),
      layerId: '2',
      pos: [1000, 1000],
      type: 'default',
      angle: 90,
      width: 50,
      height: 50
    }
  ]
] as INode[];

export const nodesPoints = [
  ...[
    {
      id: uuid(),
      pos: [701, 455],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [701, 364],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [701, 273],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [701, 182],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [701, 91],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    }
  ],
  ...[
    {
      id: uuid(),
      pos: [486, 455],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [486, 364],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [486, 273],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [486, 182],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [486, 91],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    }
  ],
  ...[
    {
      id: uuid(),
      pos: [432, 455],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [432, 364],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [432, 273],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [432, 182],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [432, 91],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    }
  ],
  ...[
    {
      id: uuid(),
      pos: [219, 455],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [219, 364],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [219, 273],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [219, 182],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [219, 91],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    }
  ],
  ...[
    {
      id: uuid(),
      pos: [519, 600],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    },
    {
      id: uuid(),
      pos: [519, 900],
      width: 10,
      height: 10,
      layerId: '2',
      type: 'point',
      angle: 0
    }
  ]
] as INode[];
