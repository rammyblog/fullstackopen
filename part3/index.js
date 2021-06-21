require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// let phonebook = require("./phonebook");
const Phonebook = require("./models/Phonebook");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("build"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

const PORT = process.env.PORT || 3001;

app.get("/info", (req, res) => {
  let date = new Date();
  Phonebook.find({}).then((p) => {
    res.send(`<p> Phonebook has info for ${p.length} people</p>`);
    res.send(date);
  });
});

app.get("/api/persons", (req, res) => {
  Phonebook.find({}).then((result) => {
    res.json(result);
  });
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  Phonebook.find({ name }).then((result) => {
    res.status(400).json({
      error: "name must be unique",
    });
  });

  const phonebook = new Phonebook({
    name,
    number,
  });

  phonebook
    .save()
    .then((result) => {
      res.json(result.toJSON()).status(201);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Phonebook.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Phonebook.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const phonebook = {
    name: body.name,
    number: body.number,
  };

  Phonebook.findByIdAndUpdate(request.params.id, phonebook, {
    new: true,
    runValidators: true,
  })
    .then((updatedNumber) => {
      response.json(updatedNumber);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

app.listen(PORT, () => `Server is running on port ${PORT}`);
