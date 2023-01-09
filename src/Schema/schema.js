import graphql, {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} from 'graphql'

import * as productUseCases from '../useCases/products.use.js'
import * as sellerUseCases from '../useCases/sellers.use.js'
import * as buyerUseCases from '../useCases/buyers.use.js'
import { Seller } from '../models/seller.model.js'
import { Buyer } from '../models/buyer.model.js'
import { Product } from '../models/product.model.js'


const SellerType = new GraphQLObjectType({
  // nos permite las relaciones entre los diferentes tipos
  name: 'Seller',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    productsToBuy: {
      // relación 1 a muchos, un profesor puede tener varios cursos
      type: new GraphQLList(ProductType),
      resolve (parent, args) {
        // return courses.filter((course) => course.professorId === parent.id);
        return productUseCases.getUserProducts2(args)
      }
    }
   
  })
})

 const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    buyer:  {
      type: ProductType,
      resolve (parent, args) {
        return productUseCases.getById(parent.productId)
      }
    }
  })
})

const BuyerType = new GraphQLObjectType({
  name: 'Buyer',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    paymentType: { type: GraphQLString },

    soldProducts: {
      type: new GraphQLList(ProductType),
      resolve (parent, args) {
        // return courses.filter((course) => course.professorId === parent.id);
        return productUseCases.getUserProducts(args)
        
        /* Product.find(
          {buyer : args.id } // el professorId que coincida con el query id
        ) */
      }
    }
  })
})
 
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    seller: {
      type: SellerType,
      args: {
        id: { type: GraphQLID }
      },
      resolve (parent, args) {
        return sellerUseCases.getById(args.id)
      }
    },
    sellers: {
      type: new GraphQLList(SellerType),
      resolve (parent, args) {
        return sellerUseCases.getAll({})
      }
    },
    product: {
      // parametro tal cual nos llega en la query
      type: ProductType,
      args: {
        id: { type: GraphQLID }
      },
      resolve (parent, args) {
        return productUseCases.getById(args.id)
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve (parent, args) {
        return productUseCases.getAll({})
      }
    },
    buyer: {
      type: BuyerType,
      args: {
        id: { type: GraphQLID }
      },
      resolve (parent, args) {
        return buyerUseCases.getById(args.id)
      }
    },
    buyers: {
      type: new GraphQLList(BuyerType),
      resolve (parent, args) {
        return buyerUseCases.getAll({})
      }
    },


  } 
})

/* // For create, update & delete
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // COURSES
    addCourse: {
      type: CourseType,
      args: {
        name: { type: GraphQLString },
        language: { type: GraphQLString },
        date: { type: GraphQLString },
        professorId: { type: GraphQLID }
      },
      resolve (parent, args) {
        const course = new Course({
          name: args.name,
          language: args.language,
          date: args.date,
          professorId: args.professorId
        })
        return course.save() // guardándolo en la DB
      }
    },
    updateACourse: {
      type: CourseType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        language: { type: GraphQLString },
        date: { type: GraphQLString },
        professorId: { type: GraphQLID }
      },
      resolve (parent, args) { // la función resolve es la que se encarga de actualizar
        return Course.findByIdAndUpdate(
          args.id, {
            name: args.name,
            language: args.language,
            date: args.date,
            professorId: args.professorId
          },
          {
            new: true // para que muestre la nueva data en la terminal cuando se actualice
          }
        )
      }
    },
    deleteACourse: {
      type: CourseType,
      args: {
        id: { type: GraphQLID }
      },
      resolve (parent, args) {
        return Course.findByIdAndDelete(args.id)
      }
    },
    deleteAllCourses: {
      type: CourseType,
      resolve (parent, args) {
        return Course.deleteMany({})
      }
    },

    // PROFESSORS
    addProfessor: {
      type: ProfessorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        active: { type: GraphQLBoolean },
        date: { type: GraphQLString }
      },
      resolve (parent, args) {
        return Professor(args).save()
      }
    },
    updateAProfessor: {
      type: ProfessorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        active: { type: GraphQLBoolean },
        date: { type: GraphQLString }
      },
      resolve (parents, args) {
        return Professor.findByIdAndUpdate(args.id, {
          name: args.name,
          age: args.age,
          active: args.active,
          date: args.date
        },
        {
          new: true
        })
      }
    },
    deleteAProfessor: {
      type: ProfessorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve (parent, args) {
        return Professor.findByIdAndDelete(args.id)
      }
    },
    deleteAllProfessors: {
      type: ProfessorType,
      resolve (parent, args) {
        return Professor.deleteMany({})
      }
    }
  }
}) */

const schema = new GraphQLSchema({
  query: RootQuery,
  //mutation: Mutation
})
export { schema }
