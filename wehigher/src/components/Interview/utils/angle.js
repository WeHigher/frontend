export const CalculateAngle = async (joint) => {
        // Parent joint
        let v1 = [
            joint[0], joint[1], joint[2],
            joint[3], joint[0], joint[5],
            joint[6], joint[7], joint[0],
            joint[9], joint[10], joint[11],
            joint[0], joint[13], joint[14],
            joint[15], joint[0], joint[17],
            joint[18], joint[19]
        ];
    
        // Child joint
        let v2 = [
            joint[1], joint[2], joint[3],
            joint[4], joint[5], joint[6],
            joint[7], joint[8], joint[9],
            joint[10], joint[11], joint[12],
            joint[13], joint[14], joint[15],
            joint[16], joint[17], joint[18],
            joint[19], joint[20]
        ];
    
        // Calculate v
        let v = [];
        for (let i = 0; i < 20; i++) {
            v.push([v2[i][0] - v1[i][0], v2[i][1] - v1[i][1], v2[i][2] - v1[i][2]]);
        }
    
        // Normalize v
        for (let i = 0; i < 20; i++) {
            let norm = Math.sqrt(v[i][0] * v[i][0] + v[i][1] * v[i][1] + v[i][2] * v[i][2]);
            v[i][0] /= norm;
            v[i][1] /= norm;
            v[i][2] /= norm;
        }
    
        // Calculate angles
        let angles = [];
        for (let i = 0; i < 15; i++) {
            let dotProduct = v[i][0] * v[i + 1][0] + v[i][1] * v[i + 1][1] + v[i][2] * v[i + 1][2];
            let angle = Math.acos(dotProduct);
            angles.push(angle);
        }
    
        // Convert radians to degrees
        for (let i = 0; i < 15; i++) {
            angles[i] = angles[i] * (180 / Math.PI);
        }
    
        // Flatten joint array
        let joint_flat = joint.flat();
    
        // Combine joint array and angles array
        let d = joint_flat.concat(angles);
    
        return d;
}

export const CheckHandness = async (results) => {

    if(results.handednesses.length === 2 ){
        let joint1 = new Array(21).fill([0, 0, 0]);
        let joint2 = new Array(21).fill([0, 0, 0]);
  
        for (let idx1 = 0; idx1 < results.landmarks[0].length; idx1++) {
            let lm1 = results.landmarks[0][idx1];
            joint1[idx1] = [lm1.x, lm1.y, lm1.z];
        }
  
        for (let idx2 = 0; idx2 < results.landmarks[1].length; idx2++) {
            let lm2 = results.landmarks[1][idx2];
            joint2[idx2] = [lm2.x, lm2.y, lm2.z];
        }
        const data1 = await CalculateAngle(joint1);
        const data2 = await CalculateAngle(joint2);

        if (results.handednesses[0][0].category_name == "LEFT"){
            return { "left" : data1, "right" : data2 };
        } else{
            return { "left" : data2, "right" : data1 };
        } 

    } else if(results.handednesses.length === 1){

        let joint = new Array(21).fill([0, 0, 0]);

        for (let idx1 = 0; idx1 < results.landmarks[0].length; idx1++) {
          let lm1 = results.landmarks[0][idx1];
          joint[idx1] = [lm1.x, lm1.y, lm1.z];
        }

        const data = await CalculateAngle(joint);

        if (results.handednesses[0][0].category_name == "LEFT"){
            return { "left" : data, "right" : [] };
        } else{
            return { "left" : [], "right" : data };
        } 

    } else {
        return null;
    }
};