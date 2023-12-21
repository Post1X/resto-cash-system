import indexRouter from "./routes/index";
var app = express();
import cors from "cors";
import sequelize from "./services/sequelize";
import createError from "http-errors";
import path from "path";
import express from "express";
var morgan = require('morgan');
import cookieParser from "cookie-parser";
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

sequelize.authenticate()
    .then(() => {
        console.log('Подключение к базе данных успешно');
    })
    .catch((error) => {
        console.error('Ошибка подключения к базе данных:', error);
        morgan.error('Database connection error:', error);
    });

app.use(morgan('combined'));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use(function (req, res, next) {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        status: "error",
        message: err.message,
        errors: err.errors,
    });
});

module.exports = app;
