DROP DATABASE nba_stats;
CREATE DATABASE nba_stats;
\c nba_stats;

CREATE TABLE game(
  id SERIAL PRIMARY KEY,
  game_date DATE,
  game_id INT,
  game_status VARCHAR(30),
  home_team_id INT,
  visitor_team_id INT,
  season FLOAT,
  team_id_home FLOAT,
  pts_home FLOAT,
  fg_pct_home FLOAT,
  ft_pct_home FLOAT,
  fg3_pct_home FLOAT,
  ast_home FLOAT,
  reb_home FLOAT,
  team_id_away INT,
  pts_away FLOAT,
  fg_pct_away FLOAT,
  ft_pct_away FLOAT,
  fg3_pct_away FLOAT,
  ast_away FLOAT,
  reb_away FLOAT,
  home_team_won INT
);
CREATE INDEX home_team_id ON game(home_team_id);
CREATE INDEX visitor_team_id ON game(visitor_team_id);

\copy game(game_date, game_id, game_status, home_team_id, visitor_team_id, season, team_id_home, pts_home, fg_pct_home, ft_pct_home, fg3_pct_home, ast_home, reb_home, team_id_away, pts_away, fg_pct_away, ft_pct_away, fg3_pct_away, ast_away, reb_away, home_team_won) FROM './archive/games.csv' WITH(FORMAT CSV, DELIMITER ',', HEADER);

CREATE TABLE team(
  id SERIAL PRIMARY KEY,
  league_id INT,
  team_id INT,
  min_year INT,
  max_year INT,
  abbreviation VARCHAR(3),
  nickname TEXT,
  year_founded INT,
  city TEXT,
  arena TEXT,
  arena_capacity INT,
  team_owner TEXT,
  gm TEXT,
  head_coach TEXT,
  d_league_affil TEXT
);

\copy team(league_id, team_id, min_year, max_year, abbreviation, nickname, year_founded, city, arena, arena_capacity, team_owner, gm, head_coach, d_league_affil) FROM './archive/teams.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
