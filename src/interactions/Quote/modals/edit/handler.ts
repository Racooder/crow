import type { ModalSubmitInteraction } from "discord.js";
import { Err, Ok, type Result } from "../../../../result.js";
import { debug } from "../../../../log.js";
import modalFields from "./fields.js";
import prisma from "../../../../prisma.js";
import { generateToken } from "../../../../token.js";

export default async function handleEditModal(interaction: ModalSubmitInteraction, args: string[]): Promise<Result> {
    debug("Handling 'quote;edit' modal submission");

    if (!args[0]) {
        return Err("No quote ID provided in modal custom ID");
    }
    if (isNaN(parseInt(args[0]))) {
        return Err("Invalid quote ID provided in modal custom ID");
    }
    const quoteId = parseInt(args[0]);

    const existingQuote = await prisma.quoteMeta.findUnique({
        where: {
            id: quoteId,
        }
    });
    if (!existingQuote) {
        return Err("Quote not found");
    }

    const author = interaction.fields.getSelectedUsers(modalFields.authorSelectMenu)?.first();
    if (!author) {
        return Err("No author selected");
    }
    const statement = interaction.fields.getTextInputValue(modalFields.statement);
    const context = interaction.fields.getTextInputValue(modalFields.quoteContext);

    const quoteMeta = await prisma.quoteMeta.update({
        where: {
            id: quoteId,
        },
        data: {
            context: context,
        }
    });

    await prisma.quoteStatement.update({
        where: {
            quoteId_order: {
                quoteId: quoteMeta.id,
                order: 0,
            }
        },
        data: {
            text: statement,
            authorId: author.id,
            authorUsername: author.tag,
        }
    });

    interaction.reply({
        content: "Quote edited successfully!",
        ephemeral: true,
    });
    return Ok();
}
