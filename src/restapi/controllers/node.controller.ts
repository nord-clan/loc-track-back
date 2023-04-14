import type { Request, Response } from 'express';
import { Router } from 'express';
import NodeService from '#/services/node.service';

class NodeController {
  public path = '/node';

  public router = Router();
  private service = new NodeService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.getAll);
    this.router.get(`${this.path}/:layerId`, this.getByLayerId);
  }

  async getByLayerId(req: Request, res: Response) {
    const data = await this.service.getByWhere({ where: { layerId: req.params.layerId } });
    res.json(data);
  }

  private getAll = async (_: Request, res: Response) => {
    const data = await this.service.getAll();
    res.json(data);
  };
}

export default NodeController;
