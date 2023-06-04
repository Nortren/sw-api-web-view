import { Controller, Get, Res, Req, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { parse } from 'url';

import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('/')
  public async showMainPage(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    const serverSideProps = { dataFromController: null };

    await this.viewService
      .getNextServer()
      .render(
        req,
        res,
        parsedUrl.pathname,
        Object.assign(parsedUrl.query, serverSideProps),
      );
  }

  @Get('/fullInformationPage/*')
  public async showVideoPage(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    const serverSideProps = { dataFromController: null };

    await this.viewService
      .getNextServer()
      .render(
        req,
        res,
        parsedUrl.pathname,
        Object.assign(parsedUrl.query, serverSideProps),
      );
  }

  @Get(':path*')
  async allRoutes(
    @Req() req: Request,
    @Res() res: Response,
    @Param('path') path: string,
  ) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, `/${path}`, parsedUrl.query);
  }
}
