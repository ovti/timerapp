import { Request, Response, NextFunction } from 'express';
import TimerSession from '../db/models/timerSession';
import { Op } from 'sequelize';

export const saveTimerSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { time } = req.query;
    console.log('Saving timer session ', time);
    console.log('User:', (req.user as any).id);
    await TimerSession.create({
      userId: (req.user as any).id,
      timeInSeconds: parseInt(time as string),
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving timer session');
  }
};

export const sessionCountToday = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionCount = await TimerSession.count({
      where: {
        userId: (req.user as any).id,
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
    res.json({ sessionCount });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching session count');
  }
};

export const totalDurationToday = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalDuration = await TimerSession.sum('timeInSeconds', {
      where: {
        userId: (req.user as any).id,
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
    res.json({ totalDuration });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching total duration');
  }
};
