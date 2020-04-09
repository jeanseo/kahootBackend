const graphql = require('graphql');
const { composeWithMongoose } = require('graphql-compose-mongoose') ;
const { schemaComposer } = require('graphql-compose');
const Quiz = require('../models/Quiz');
const Game = require('../models/Game');
const Answer = require('../models/Answer');

const {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt,GraphQLSchema,
    GraphQLList,GraphQLNonNull
} = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and describes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

const customizationOptions = {}; // left it empty for simplicity, described below
const QuizTC = composeWithMongoose(Quiz, customizationOptions);
const GameTC = composeWithMongoose(Game, customizationOptions);

schemaComposer.Query.addFields({
    quizById: QuizTC.getResolver('findById'),
    quizByIds: QuizTC.getResolver('findByIds'),
    quizOne: QuizTC.getResolver('findOne'),
    quizMany: QuizTC.getResolver('findMany'),
    quizCount: QuizTC.getResolver('count'),
    quizConnection: QuizTC.getResolver('connection'),
    quizPagination: QuizTC.getResolver('pagination'),
    gameById: GameTC.getResolver('findById'),
    gameByIds: GameTC.getResolver('findByIds'),
    gameOne: GameTC.getResolver('findOne'),
    gameMany: GameTC.getResolver('findMany'),
    gameCount: GameTC.getResolver('count'),
    gameConnection: GameTC.getResolver('connection'),
    gamePagination: GameTC.getResolver('pagination'),

});

schemaComposer.Mutation.addFields({
    quizCreateOne: QuizTC.getResolver('createOne'),
    quizCreateMany: QuizTC.getResolver('createMany'),
    quizUpdateById: QuizTC.getResolver('updateById'),
    quizUpdateOne: QuizTC.getResolver('updateOne'),
    quizUpdateMany: QuizTC.getResolver('updateMany'),
    quizRemoveById: QuizTC.getResolver('removeById'),
    quizRemoveOne: QuizTC.getResolver('removeOne'),
    quizRemoveMany: QuizTC.getResolver('removeMany'),
    gameCreateOne: GameTC.getResolver('createOne'),
    gameCreateMany: GameTC.getResolver('createMany'),
    gameUpdateById: GameTC.getResolver('updateById'),
    gameUpdateOne: GameTC.getResolver('updateOne'),
    gameUpdateMany: GameTC.getResolver('updateMany'),
    gameRemoveById: GameTC.getResolver('removeById'),
    gameRemoveOne: GameTC.getResolver('removeOne'),
    gameRemoveMany: GameTC.getResolver('removeMany'),
});


module.exports = schemaComposer.buildSchema();

