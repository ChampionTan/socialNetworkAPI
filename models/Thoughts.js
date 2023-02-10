const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: value => value.toDateString()
    },
  },
);


const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
      
    },
    createdAt: {
    type: Date,
    default: Date.now,
    get: value => value.toDateString()
  },
    toJSON: {
      virtuals: true,
      getters: true,
    },
    
    reactions: [reactionSchema],
  }
);

thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
});

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;
