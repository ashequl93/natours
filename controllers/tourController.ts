const fs = require('fs');
import { Request, Response } from 'express';

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestedTime,
    data: {
      tours,
    },
  });
};

exports.addNewTour = (req: Request, res: Response) => {
  // get new Id of the tour
  const newTourId = tours[tours.length - 1].id + 1;
  // push it to the tours object
  const newTour = {
    id: newTourId,
    ...req.body,
  };
  tours.push(newTour);
  // write the new object to the file
  fs.writeFile(
    `${__dirname}/../../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).send('Error saving new tour.');
        return;
      }
      res.json({
        status: 'success',
        requestedAt: req.requestedTime,
        data: {
          newTour,
        },
      });
    }
  );
};

exports.getATour = (req: Request, res: Response) => {
  const { id } = req.params;
  const tourId = +id;

  const tour = tours.find((tour) => tour.id === tourId);
  res.json({
    status: 'success',
    requestedAt: req.requestedTime,
    data: {
      tour,
    },
  });
};
