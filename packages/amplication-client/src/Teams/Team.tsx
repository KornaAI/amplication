import {
  FlexItem,
  Snackbar,
  TabContentTitle,
} from "@amplication/ui/design-system";
import { useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { formatError } from "../util/error";
import useTeams from "./hooks/useTeams";
import TeamForm from "./TeamForm";
import { DeleteTeam } from "./DeleteTeam";
import { useAppContext } from "../context/appContext";
import TeamMemberList from "./TeamMemberList";

const Team = () => {
  const match = useRouteMatch<{
    teamId: string;
  }>(["/:workspace/settings/teams/:teamId"]);

  const { currentWorkspace } = useAppContext();
  const baseUrl = `/${currentWorkspace?.id}/settings`;
  const history = useHistory();

  const { teamId } = match?.params ?? {};

  const {
    getTeamData: data,
    getTeamError: error,
    getTeamLoading: loading,
    updateTeam,
    updateTeamError: updateError,
  } = useTeams(teamId);

  const handleSubmit = useCallback(
    (data) => {
      updateTeam({
        variables: {
          where: {
            id: teamId,
          },
          data,
        },
      }).catch(console.error);
    },
    [updateTeam, teamId]
  );

  const handleDeleteModule = useCallback(() => {
    history.push(`${baseUrl}/teams`);
  }, [history, baseUrl]);

  const hasError = Boolean(error) || Boolean(updateError);
  const errorMessage = formatError(error) || formatError(updateError);

  return (
    <>
      <FlexItem>
        <TabContentTitle
          title={data?.team?.name}
          subTitle={data?.team?.description}
        />
        <FlexItem.FlexEnd>
          {data?.team && (
            <DeleteTeam team={data?.team} onDelete={handleDeleteModule} />
          )}
        </FlexItem.FlexEnd>
      </FlexItem>
      {!loading && (
        <TeamForm onSubmit={handleSubmit} defaultValues={data?.team} />
      )}
      <TabContentTitle title="Members" subTitle="Add or remove team members" />
      <TeamMemberList team={data?.team} />
      <Snackbar open={hasError} message={errorMessage} />
    </>
  );
};

export default Team;
