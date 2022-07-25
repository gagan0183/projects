module.exports = {
    notes: async (parent, args, { models }) => {
        const notes = await models.Note.find();
        return notes;
    },
    note: async (parent, args, { models }) => {
        return await models.Note.findById(args.id)
    }
}
