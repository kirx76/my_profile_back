import Controller from "../../interfaces/controller.interface";
import express from "express";
import {getRepository} from "typeorm";
import Travel from "./travel.entity";
import validationMiddleware from "../../middleware/validation.middleware";
import CreateTravelDto from "./travel.dto";
import PostNotFoundException from "../../exceptions/PostNotFoundException";

export default class TravelController implements Controller {
  public path = '/travel'
  public router = express.Router();
  private travelRepository = getRepository(Travel);

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes = () => {
    this.router.get(this.path, this.getAllTravel)
    this.router.post(this.path, validationMiddleware(CreateTravelDto, true), this.createTravel)
    this.router.delete(`${this.path}/:id`, this.deleteTravel)
  }

  private getAllTravel = async (request: express.Request, response: express.Response) => {
    console.log('getAllTravel')
    const travels = await this.travelRepository.find();
    response.send(travels)
  }

  private createTravel = async (request: express.Request, response: express.Response) => {
    console.log('createTravel')
    const travelData: CreateTravelDto = request.body;
    const newTravel = this.travelRepository.create({
      ...travelData
    });
    await this.travelRepository.save(newTravel);
    response.send(newTravel);
  }

  private deleteTravel = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    console.log('deleteTravel')
    const id = request.params.id;
    const content = await this.travelRepository.delete(id)
    console.log(content, id)
    if (content.affected > 0) {
      response.sendStatus(200);
    } else {
      next(new PostNotFoundException(id));
    }
  }
}