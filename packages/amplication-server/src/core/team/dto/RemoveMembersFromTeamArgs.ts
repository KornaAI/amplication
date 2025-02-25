import { ArgsType, Field } from "@nestjs/graphql";
import { WhereUniqueInput } from "../../../dto";
import { TeamUpdateMembersInput } from "./TeamUpdateMembersInput";

@ArgsType()
export class RemoveMembersFromTeamArgs {
  @Field(() => TeamUpdateMembersInput, { nullable: false })
  data!: TeamUpdateMembersInput;

  @Field(() => WhereUniqueInput, { nullable: false })
  where!: WhereUniqueInput;
}
