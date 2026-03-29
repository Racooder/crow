import type { ModalSubmitInteraction } from "discord.js";
import { Err, Ok, type Result } from "../../../../result.js";
import { debug } from "../../../../log.js";
import addQuoteMetaModalFields from "./fields.js";
import prisma from "../../../../prisma.js";
import { generateToken } from "../../../../token.js";

export default async function handleAddModal(interaction: ModalSubmitInteraction, _args: string[]): Promise<Result> {
    debug("Handling 'quote;add' modal submission");

    const author = interaction.fields.getSelectedUsers(addQuoteMetaModalFields.authorSelectMenu)?.first();
    if (!author) {
        return Err("No author selected");
    }
    const statement = interaction.fields.getTextInputValue(addQuoteMetaModalFields.statement);
    const context = interaction.fields.getTextInputValue(addQuoteMetaModalFields.quoteContext);

    const quoteMeta = await prisma.quoteMeta.create({
        data: {
            token: generateToken(),
            creatorId: interaction.user.id,
            creatorUsername: interaction.user.tag,
            context: context,
            guildId: interaction.guildId || interaction.user.id,
        }
    });

    await prisma.quoteStatement.create({
        data: {
            quoteId: quoteMeta.id,
            text: statement,
            authorId: author.id,
            authorUsername: author.tag,
            order: 0,
        }
    });


    interaction.reply({
        content: "Quote added successfully!",
        ephemeral: true,
    });
    return Ok();
}
