import { FC, useState, useLayoutEffect } from "react";
import { App, Device, ModuleData } from "@formant/data-sdk";
import { CompletionCircle } from "./CompletionCircle";
import styles from "./FieldOpModule.module.scss";
import { PauseIcon } from "./PauseIcon";
import { RunningIcon } from "./RunningIcon";

interface IFieldOpModuleProps {
  device: Device | undefined;
}

export const FieldOpModule: FC<IFieldOpModuleProps> = ({ device }) => {
  const [path_data_time_of_validity, set_path_data_time_of_validity] = useState("-");
  const [path_name, set_path_name] = useState("-");
  const [path_id, set_path_id] = useState("-");
  const [start_position_latitude_rad, set_start_position_latitude_rad] = useState("-");
  const [start_position_longitude_rad, set_start_position_longitude_rad] = useState("-");
  const [distance_to_path_start_m, set_distance_to_path_start_m] = useState("-");
  const [angle_to_start_robot_frame_rad, set_angle_to_start_robot_frame_rad] = useState("-");
  const [completion_fraction, set_completion_fraction] = useState("-");
  const [can_follow, set_can_follow] = useState("-");

  const [approximate_time_remaining_sec, set_approximate_time_remaining_sec] = useState("-");
  const [completed_length_m, set_completed_length_m] = useState("-");
  const [total_length_m, set_total_length_m] = useState("-");
  const [crosstrack_error_m, set_crosstrack_error_m] = useState("-");
  const [state_machine_state, set_state_machine_state] = useState("-");

  const [gps_data_time_of_validity, set_gps_data_time_of_validity] = useState("-");
  const [latitude_rad, set_latitude_rad] = useState("-");
  const [longitude_rad, set_longitude_rad] = useState("-");
  const [hdop_m, set_hdop_m] = useState("-");
  const [vdop_m, set_vdop_m] = useState("-");
  const [fix, set_fix] = useState("-");

  const [orientation_data_time_of_validity, set_orientation_data_time_of_validity] = useState("-");
  const [heading_clockwise_from_north_deg, set_heading_clockwise_from_north_deg] = useState("-");

  const shouldClearData = (
    lastUpdate: number,
    scruttingTime: number,
    seconds: number
  ) => {
    return lastUpdate + seconds * 1000 < scruttingTime;
  };

  useLayoutEffect(() => {
    App.addModuleDataListener(setData);
  }, [device]);

  const setData = (newValue: ModuleData) => {
    const streams = newValue.streams;
    if (Object.keys(streams).length === 0) {
      throw new Error("No streams.");
    }

    Object.keys(streams).forEach((stream) => {
      const latestState = getLatestData(streams, stream);
      if (latestState[1] === undefined) return;

      if (streams[stream].data[0].name === "pathdata.tov") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_path_data_time_of_validity("-");
          return;
        }
        set_path_data_time_of_validity(latestState[1]);
      }
      if (streams[stream].data[0].name === "path.name") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_path_name("-");
          return;
        }
        set_path_name(latestState[1]);
      }

      if (streams[stream].data[0].name === "path.id") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_path_id("-");
          return;
        }
        set_path_id(latestState[1]);
      }
      if (streams[stream].data[0].name === "startpos.lat") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_start_position_latitude_rad("-");
          return;
        }
        set_start_position_latitude_rad(latestState[1]);
      }
      if (streams[stream].data[0].name === "startpos.lon") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_start_position_longitude_rad("-");
          return;
        }
        set_start_position_longitude_rad(latestState[1]);
      }
      if (streams[stream].data[0].name === "startpos.dist") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_distance_to_path_start_m("-");
          return;
        }
        set_distance_to_path_start_m(latestState[1]);
      }
      if (streams[stream].data[0].name === "startpos.angle") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_angle_to_start_robot_frame_rad("-");
          return;
        }
        set_angle_to_start_robot_frame_rad(latestState[1]);
      }
      if (streams[stream].data[0].name === "completion.fraction") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_completion_fraction("-");
          return;
        }
        set_completion_fraction(latestState[1]);
      }
      if (streams[stream].data[0].name === "can.follow") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_can_follow("-");
          return;
        }
        set_can_follow(latestState[1]);
      }


      if (streams[stream].data[0].name === "time.remaining") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_approximate_time_remaining_sec("-");
          return;
        }
        set_approximate_time_remaining_sec(latestState[1]);
      }
      if (streams[stream].data[0].name === "completed.length") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_completed_length_m("-");
          return;
        }
        set_completed_length_m(latestState[1]);
      }
      if (streams[stream].data[0].name === "total.length") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_total_length_m("-");
          return;
        }
        set_total_length_m(latestState[1]);
      }
      if (streams[stream].data[0].name === "crosstrack.error") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_crosstrack_error_m("-");
          return;
        }
        set_crosstrack_error_m(latestState[1]);
      }
      if (streams[stream].data[0].name === "machine.state") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_state_machine_state("-");
          return;
        }
        set_state_machine_state(latestState[1]);
      }


      if (streams[stream].data[0].name === "gps.tov") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_gps_data_time_of_validity("-");
          return;
        }
        set_gps_data_time_of_validity(latestState[1]);
      }
      if (streams[stream].data[0].name === "latitude.rad") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_latitude_rad("-");
          return;
        }
        set_latitude_rad(latestState[1]);
      }
      if (streams[stream].data[0].name === "longitude.rad") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_longitude_rad("-");
          return;
        }
        set_longitude_rad(latestState[1]);
      }
      if (streams[stream].data[0].name === "hdop") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_hdop_m("-");
          return;
        }
        set_hdop_m(latestState[1]);
      }
      if (streams[stream].data[0].name === "vdop") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_vdop_m("-");
          return;
        }
        set_vdop_m(latestState[1]);
      }
      if (streams[stream].data[0].name === "gpsfix.state") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_fix("-");
          return;
        }
        set_fix(latestState[1]);
      }


      if (streams[stream].data[0].name === "orientation.tov") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_orientation_data_time_of_validity("-");
          return;
        }
        set_orientation_data_time_of_validity(latestState[1]);
      }
      if (streams[stream].data[0].name === "north.heading") {
        if (shouldClearData(latestState[0], newValue.time, 10)) {
          set_heading_clockwise_from_north_deg("-");
          return;
        }
        // let status = (
        //   (latestState[1] as string).replaceAll('"', "")[0].toUpperCase() +
        //   (latestState[1] as string).replaceAll('"', "").slice(1)
        // ).trim();
        set_heading_clockwise_from_north_deg(latestState[1]);
      }
    });
  };

  return (
    <div>
      <div className={styles.status}>
        <span>{`path TOV: ${path_data_time_of_validity}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`path name: ${path_name}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`path ID: ${path_id}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`home lat(rad): ${start_position_latitude_rad}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`home lon(rad): ${start_position_longitude_rad}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`home dist: ${distance_to_path_start_m}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`home angle(rad): ${angle_to_start_robot_frame_rad}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`completion fraction: ${completion_fraction}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`can follow: ${can_follow}`}</span>
      </div>


      <div className={styles.status}>
        <span>{`time remaining(s): ${approximate_time_remaining_sec}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`completed length(m): ${completed_length_m}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`total length(m): ${total_length_m}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`crosstrack error: ${crosstrack_error_m}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`state: ${state_machine_state}`}</span>
      </div>


      <div className={styles.status}>
        <span>{`GPS TOV: ${gps_data_time_of_validity}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`lat(rad): ${latitude_rad}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`lon(rad): ${longitude_rad}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`hdop(m): ${hdop_m}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`vdop(m): ${vdop_m}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`fix status: ${fix}`}</span>
      </div>


      <div className={styles.status}>
        <span>{`orientation TOV: ${orientation_data_time_of_validity}`}</span>
      </div>
      <div className={styles.status}>
        <span>{`clockwise heading from North(deg): ${heading_clockwise_from_north_deg}`}</span>
      </div>
    </div>
  );
};

const getLatestData = (
  moduleData: any,
  stream: string
): any | number | undefined => {
  if (moduleData[stream] === undefined) {
    return "No stream.";
  }
  if (moduleData[stream].loading) {
    return undefined;
  }
  if (moduleData[stream].tooMuchData) {
    return "Too much data.";
  }

  if (moduleData[stream].data.length === 0) {
    return "No data.";
  }
  const latestPoint = moduleData[stream].data[0].points.at(-1);

  if (!latestPoint) {
    return "No datapoints.";
  }

  return latestPoint;
};
