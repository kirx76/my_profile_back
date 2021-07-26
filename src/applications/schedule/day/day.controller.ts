import Controller from "../../../interfaces/controller.interface";
import express from "express";
import {getRepository} from "typeorm";
import Day from "./day.entity";
import validationMiddleware from "../../../middleware/validation.middleware";
import CreateDayDto from "./day.dto";
import PostNotFoundException from "../../../exceptions/PostNotFoundException";

export default class DayController implements Controller {
  public path = '/day';
  public router = express.Router();
  private dayRepository = getRepository(Day);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(this.path, this.getAllDays)
      .get(`${this.path}/:id`, this.getOneDay)
    this.router.post(this.path, validationMiddleware(CreateDayDto), this.createDay)
      .patch(`${this.path}/:id`, validationMiddleware(CreateDayDto, true), this.patchDay)
      .delete(`${this.path}/:id`, this.deleteDay)
  }

  private getAllDays = async (request: express.Request, response: express.Response) => {
    console.log('getAllDays')
    const days = await this.dayRepository.find({order: {id: "ASC"}});
    response.send(days)
  }

  private getOneDay = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    console.log('getOneDay')
    const id = request.params.id;
    const day = await this.dayRepository.findOne(id);
    if (day) {
      response.send(day)
    } else {
      next(new PostNotFoundException(id))
    }
  }

  private deleteDay = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    console.log('deleteDay')
    const id = request.params.id;
    const content = await this.dayRepository.delete(id)
    if (content.affected > 0) {
      response.sendStatus(200)
    } else {
      next(new PostNotFoundException(id))
    }
  }


  private patchDay = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    console.log('patchDay')
    const id = request.params.id;
    const dayData: Day = request.body;

    await this.dayRepository.update(id, dayData);
    const updatedDay = await this.dayRepository.findOne(id);
    if (updatedDay) {
      response.send(updatedDay)
    } else {
      next(new PostNotFoundException(id))
    }
  }

  private createDay = async (request: express.Request, response: express.Response) => {
    console.log('createDay')
    const dayData: CreateDayDto = request.body;
    const newDay = this.dayRepository.create({
      ...dayData
    })
    await this.dayRepository.save(newDay);

    response.send(newDay);
  }
}