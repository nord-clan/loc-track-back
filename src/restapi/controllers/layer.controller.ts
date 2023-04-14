import type { Request, Response } from 'express';
import { Router } from 'express';
import LayerService from '#/services/layer.service';

class LayerController {
  public path = '/layer';

  public router = Router();
  private service = new LayerService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.getAll);
    this.router.get(`${this.path}/:officeId`, this.getByOfficeId);
  }

  async getByOfficeId(req: Request, res: Response) {
    const data = await this.service.getByWhere({ where: { officeId: req.params.officeId } });
    res.json(data);
  }

  private getAll = async (_: Request, res: Response) => {
    const data = await this.service.getAll();
    res.json(data);
  };
}

export default LayerController;
