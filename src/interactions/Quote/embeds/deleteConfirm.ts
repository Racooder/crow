import { EmbedBuilder, Guild } from "discord.js";
import type { QuoteStatement } from "../../../generated/prisma/browser.js";
import Colors from "../../../Colors.js";
import { isUserInGuild } from "../../../util/guild.js";

export default async function createDeleteConfirmEmbed(statements: QuoteStatement[], guild: Guild): Promise<EmbedBuilder> {
    return new EmbedBuilder()
        .setTitle("Are you sure you want to delete this quote?")
        .setDescription(await formatStatements(statements, guild))
        .setColor(Colors.CONFIRM_DANGEROUS_EMBED);
}

async function formatStatements(statements: QuoteStatement[], guild: Guild): Promise<string> {
    return Promise.all(statements.map(s => formatSingleStatement(s, guild))).then(lines => lines.join("\n"));
}

async function formatSingleStatement(statement: QuoteStatement, guild: Guild): Promise<string> {
    const author = await formatStatementAuthor(statement, guild);
    return `"${statement.text}" - ${author}`;
}

async function formatStatementAuthor(statement: QuoteStatement, guild: Guild): Promise<string> {
    if (await isUserInGuild(statement.authorId, guild)) {
        return `<@${statement.authorId}>`;
    }
    return statement.authorUsername;
}
